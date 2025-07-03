/*
 * app.js
 * App Entry Point - Legislative Lookup Page
 * Created: Winter 2021
 * Purpose: The JS starting point for the Elected Officials Lookup page.
 * Note: Unlike other HSUS/HSI/WLT page types, this page does not use an Enya
 * module of its own. This page uses the surveys wrapper and its CSS and JS
 * builds. There is no "legislative-lookup" wrapper.
 * So we've got both the surveys outputs and the legislative-lookup outputs in
 * a single page.
 * FYI, the JS and CSS files for this page live in the Static Page Assets
 * folder in the EN component library.
 */

import "whatwg-fetch";
import "../scss/main.scss";

import * as utils from "utils/utilities";

// Webpack makes jQuery available without an import statement. See
// webpack.common.js
// eslint-disable-next-line no-undef
const $ = jQuery;

const civicBaseApiUrl = "https://www.googleapis.com/civicinfo/v2";
const openStatesBaseApiUrl = "https://v3.openstates.org";
const requiredOffices = [
  "administrativeArea1-legislatorUpperBody",
  "administrativeArea1-legislatorLowerBody"
];
const requireOfficeExceptions = {
  "administrativeArea1-legislatorUpperBody": ["DC"],
  "administrativeArea1-legislatorLowerBody": ["NE", "DC"],
};

let currentPlace = {};

const buildAddressString = (place) => {
  return place.formatted_address;
};

const getCivicInfo = (address) => {
  return fetch(
    civicBaseApiUrl +
      "/representatives?" +
      new URLSearchParams({
        key: process.env.GOOGLE_APIS_KEY,
        address
      })
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data);
      } else {
        return data;
      }
    });
};

const getOpenStateInfo = (latLng) => {
  return fetch(
    `${openStatesBaseApiUrl}/people.geo?include=links&include=offices&` +
      new URLSearchParams({
        apikey: process.env.OPEN_STATES_API_KEY,
        lat: latLng.lat,
        lng: latLng.lng
      })
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const handleError = (error) => {
  console.log(error);
};

const makeChannelUrl = (type, id) => {
  switch (type.toLowerCase()) {
    case "facebook":
      return "https://www.facebook.com/" + id;
    case "twitter":
      return "https://twitter.com/" + id;
    // YouTube values vary between User and Channel id without a note of which
    // is which. URL construction for each of those is different so for now,
    // skip YouTube link.
    case "youtube":
      return false;
      // return "https://www.youtube.com/user/" + id;
  }
  return "#";
};

const processCivicData = (data) => {
  let completeData = true;

  // Check if more data is needed.
  requiredOffices.forEach((office) => {
    if (
      !requireOfficeExceptions[office] ||
      requireOfficeExceptions[office].indexOf(data.normalizedInput.state) === -1
    ) {
      const [level, role] = office.split("-");

      let found = false;

      data.offices.forEach((resultOffice) => {
        if (
          resultOffice.levels &&
          resultOffice.levels.indexOf(level) >= 0 &&
          resultOffice.roles &&
          resultOffice.roles.indexOf(role) >= 0
        ) {
          found = true;
        }
      });

      completeData = completeData && found;
    }
  });

  // Load data into tabs.
  const targetContainer = $(".js-elected-official-list-container");
  targetContainer.empty();
  data.offices.forEach((office) => {
    let level = "local";
    if (office.levels && office.levels.length) {
      switch (office.levels[0]) {
        case "country":
          level = "federal";
          break;
        case "administrativeArea1":
          level = "state";
          break;
        default:
          level = "local";
          break;
      }
    }

    office.officialIndices.forEach((officialIndex) => {
      const official = data.officials[officialIndex];
      official.level = level;
      official.role =
        office.roles && office.roles.length ? office.roles[0] : "unknown";
      official.title = office.name;
      if (official.address && official.address.length) {
        official.addresses = official.address.map((address) => {
          return (
            (address.line1 ? address.line1 + "<br/>" : "") +
            (address.line2 ? address.line2 + "<br/>" : "") +
            (address.city ? address.city + ", " : "") +
            (address.state ? address.state + " " : "") +
            (address.zip ? address.zip + " " : "")
          );
        });
      }

      targetContainer.append(populateTemplate(official));
    });
  });
  if (!completeData) {
    // Geocode and request Open States data.
    getOpenStateInfo({
      lat: currentPlace.geometry.location.lat(),
      lng: currentPlace.geometry.location.lng()
    }).then((response) => {
      const stateOfficials = response.results;
      stateOfficials.forEach((stateOfficial) => {
        const official = {
          level: "state",
          role: stateOfficial.current_role.title
            .toLowerCase()
            .replace(/ /g, "_"),
          photoUrl: stateOfficial.image,
          name: stateOfficial.name,
          party: stateOfficial.party,
          title:
            stateOfficial.jurisdiction.name +
            " " +
            utils.capitalize(stateOfficial.jurisdiction.classification) +
            " " +
            stateOfficial.current_role.title
        };
        if (stateOfficial.offices && stateOfficial.offices.length) {
          official.phones = stateOfficial.offices
            .filter((office) => typeof office.voice !== "undefined")
            .map((office) => {
              let number = office.voice;
              // eslint-disable-next-line no-undef
              if (PhoneNumber) {
                // eslint-disable-next-line no-undef
                number = new PhoneNumber(office.voice, "US").getNumber(
                  "national"
                );
              }
              return number;
            });
          official.addresses = stateOfficial.offices.map((office) => {
            const address = office.address.replace(/;/g, ",");
            const addressPieces = address.split(",");
            switch (addressPieces.length) {
              case 3:
                return (
                  addressPieces[0] +
                  "<br/>" +
                  addressPieces[1].trim() +
                  "," +
                  addressPieces[2]
                );
              case 4:
                return (
                  addressPieces[0] +
                  "<br/>" +
                  addressPieces[1].trim() +
                  "<br/>" +
                  addressPieces[2].trim() +
                  "," +
                  addressPieces[3]
                );
              default:
                return address;
            }
          });
        }
        if (stateOfficial.links && stateOfficial.links.length) {
          official.urls = stateOfficial.links.reverse().map((url) => url.url);
        }
        if ($(".js-state-deputyHeadOfGovernment").length) {
          $(".js-state-deputyHeadOfGovernment").after(
            populateTemplate(official)
          );
        } else if ($(".js-state-headOfGovernment").length) {
          $(".js-state-headOfGovernment").after(populateTemplate(official));
        } else {
          $('[class*="js-federal-"]:last').after(populateTemplate(official));
        }
      });
      $(".js-elected-officials-results").show();
    });
  } else {
    $(".js-elected-officials-results").show();
  }
};

const simplifyUrl = (url) => {
  return url.replace(/^http(s)?\:\/\/(www\.)?/i, "").replace(/\/$/, "");
};

const populateTemplate = (official) => {
  const template = $(".js-elected-official-card-template").clone();
  template
    .removeClass("always-hidden")
    .removeClass("js-elected-official-card-template")
    .addClass("js-elected-official-card")
    .addClass("js-" + official.level + "-" + official.role);
  template.attr("data-level", official.level);
  template.find(".js-elected-official-contact-info").empty();
  if (official.photoUrl) {
    template.find(".js-elected-official-photo").attr("src", official.photoUrl);
  } else {
    template.find(".js-elected-official-photo").remove();
  }
  template.find(".js-elected-official-name").text(official.name);
  template
    .find(".js-elected-official-title")
    .text(official.title + " (" + official.party.substr(0, 1) + ")");
  if (official.phones && official.phones.length) {
    template.find(".js-elected-official-contact-info").append(
      `
      <div class="row row__contact-info clearfix">
        <div class="pull-left label__content">Phone</div>
        <div class="pull-right">
        ${official.phones[0]}
        </div>
      </div>
    `
    );
  }
  if (official.urls && official.urls.length) {
    template.find(".js-elected-official-contact-info").append(
      `
        <div class="row row__contact-info clearfix">
          <div class="pull-left label__content">Website</div>
          <div class="pull-right">
            <a href="${official.urls[0]}" target="_blank">${simplifyUrl(official.urls[0])}</a>
          </div>
        </div>
      `
    );
  }
  if (official.channels) {
    official.channels.forEach((channel) => {
      const channelUrl = makeChannelUrl(channel.type, channel.id);
      if (channelUrl !== false) {
        template.find(".js-elected-official-contact-info").append(
          `
            <div class="row row__contact-info clearfix">
              <div class="pull-left label__content">
                ${channel.type}
              </div>
              <div class="pull-right">
                <a href="${channelUrl}" target="_blank">${simplifyUrl(channelUrl)}</a>
              </div>
            </div>
          `
        );
      }
    });
  }
  if (official.addresses && official.addresses.length) {
    template
      .find(".js-elected-official-address")
      .append('<span class="label__content">Mailing address</span>');
    official.addresses.forEach((address) => {
      template.find(".js-elected-official-contact-info").append(
        `
          <div class="row row__contact-info clearfix">
            <div class="pull-left label__content">Mailing address</div>
            <div class="pull-right">${address}</div>
          </div>
        `
      );
    });
  }
  return template;
};

const init = () => {
  const params = new URLSearchParams(window.location.search);
  const preSelectedTab = params.get("tab");
  if (
    preSelectedTab &&
    $('.findreps-tab[data-filter-list="' + preSelectedTab.toLowerCase() + '"]')
  ) {
    $(".findreps-tab.active").removeClass("active");
    $(
      '.findreps-tab[data-filter-list="' + preSelectedTab.toLowerCase() + '"]'
    ).addClass("active");
  }

  const options = {
    componentRestrictions: { country: "us" },
    types: ["address"]
  };
  $('input[name="places-autocomplete"]').on("keydown", (ev) => {
    switch (ev.which) {
      case 13:
        ev.preventDefault();
        break;
    }
  });
  $('input[name="places-autocomplete"]').on("input", (ev) => {
    $(".error__places-autocomplete").remove();
  });

  // eslint-disable-next-line no-undef
  const autocomplete = new google.maps.places.Autocomplete(
    $('input[name="places-autocomplete"]')[0],
    options
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      $(".error__places-autocomplete").remove();
      $('input[name="places-autocomplete"]').after(
        "<label class='en__field__error error__places-autocomplete'>No details available for “" +
          place.name +
          ".” Please begin typing and select from the list of suggestions.</label>"
      );
      return;
    }
    currentPlace = place;

    // Assign state.
    $(".js-state-name").text(
      currentPlace.address_components.filter(
        (item) => item.types.indexOf("administrative_area_level_1") > -1
      )[0].long_name
    );
    $(".js-elected-official-list-container").empty();
    getCivicInfo(buildAddressString(currentPlace))
      .then(processCivicData)
      .then(() => {
        $(".findreps-tab.active").trigger("click");
      })
      .catch(handleError);
  });

  $(".findreps-tab").on("click", (ev) => {
    $(".findreps-tab.active").removeClass("active");
    $(ev.target).addClass("active");
    if ($(ev.target).data("filter-list") == "all") {
      $(".js-elected-official-list-container").children().show();
    } else {
      $(".js-elected-official-list-container").children().hide();
      $(
        '.js-elected-official-list-container [data-level="' +
          $(ev.target).data("filter-list") +
          '"]'
      ).show();
    }
  });

  // Fire an event telling the page that Enya has finished initializing.
  const enyaReady = new Event("enyaReady");
  document.dispatchEvent(enyaReady);
  console.groupCollapsed(`This is Enya. 🐇`);
  console.info(`Page type: legislative-lookup`);
  console.info(`Branch: ${BRANCH}`);
  console.info(`Last commit time: ${LASTCOMMITDATETIME}`);
  console.info(`Last commit hash: ${COMMITHASH.substring(0, 8)}`);
  console.groupEnd();
};

$(document).ready(() => {
  init();
});
