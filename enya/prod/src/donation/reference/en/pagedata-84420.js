(function() {
  const en = {};

  en.dependencies = [{
    conditions: [{
      condition: "AND",
      target: "field:995317",
      comparator: "==",
      value: "Y"
    }],
    actions: [{
      type: "altlist",
      target: "995316",
      altlist: "alt1"
    }, {
      type: "setValue",
      target: "field:995316",
      value: "36"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:995317",
      comparator: "==",
      value: "N"
    }],
    actions: [{
      type: "altlist",
      target: "995316",
      altlist: "alt0"
    }, {
      type: "setValue",
      target: "field:995316",
      value: "60"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:995317",
      comparator: "==",
      value: "Y"
    }],
    actions: [{
      type: "setValue",
      target: "field:995320",
      value: "H02E00000XX240_84420"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:995317",
      comparator: "==",
      value: "N"
    }],
    actions: [{
      type: "setValue",
      target: "field:995320",
      value: "HACE00000XX240_84420"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:995317",
      comparator: "==",
      value: "Y"
    }, {
      condition: "AND",
      target: "field:1142012",
      comparator: "==",
      value: "37611"
    }],
    actions: [{
      type: "setValue",
      target: "field:995316",
      value: "37"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:1204538",
      comparator: "==",
      value: "PayPal"
    }],
    actions: [{
      type: "showHide",
      display: "Hide",
      target: "field:1204539"
    }, {
      type: "showHide",
      display: "Hide",
      target: "field:1204543"
    }, {
      type: "showHide",
      display: "Hide",
      target: "field:1204541"
    }, {
      type: "showHide",
      display: "Hide",
      target: "field:1204545"
    }, {
      type: "showHide",
      display: "Hide",
      target: "field:1204544"
    }, {
      type: "showHide",
      display: "Hide",
      target: "field:1204542"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:1204538",
      comparator: "==",
      value: "Bank"
    }],
    actions: [{
      type: "showHide",
      display: "Show",
      target: "field:1204545"
    }, {
      type: "showHide",
      display: "Show",
      target: "field:1204544"
    }, {
      type: "showHide",
      display: "Show",
      target: "field:1204542"
    }]
  }, {
    conditions: [{
      condition: "AND",
      target: "field:1204538",
      comparator: "==",
      value: "Credit"
    }],
    actions: [{
      type: "showHide",
      display: "Show",
      target: "field:1204539"
    }, {
      type: "showHide",
      display: "Show",
      target: "field:1204543"
    }, {
      type: "showHide",
      display: "Show",
      target: "field:1204541"
    }]
  }];

  en.altLists = [{
    id: 995316,
    data: [{
      name: "alt0",
      data: [{
        selected: false,
        value: "35",
        label: "$35",
        forId: "",
        imageUrl: ""
      }, {
        selected: true,
        value: "60",
        label: "$60",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "100",
        label: "$100",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "500",
        label: "$500",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "1000",
        label: "$1,000",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "other",
        label: "Other amount",
        forId: "",
        imageUrl: ""
      }]
    }, {
      name: "alt1",
      data: [{
        selected: false,
        value: "19",
        label: "$19",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "25",
        label: "$25",
        forId: "",
        imageUrl: ""
      }, {
        selected: true,
        value: "36",
        label: "$36",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "50",
        label: "$50",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "100",
        label: "$100",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "other",
        label: "Other amount",
        forId: "",
        imageUrl: ""
      }]
    }, {
      name: "alt2",
      data: [{
        selected: false,
        value: "20",
        label: "$20",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "26",
        label: "$26",
        forId: "",
        imageUrl: ""
      }, {
        selected: true,
        value: "37",
        label: "$37",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "51",
        label: "$51",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "101",
        label: "$101",
        forId: "",
        imageUrl: ""
      }, {
        selected: false,
        value: "other",
        label: "Other amount",
        forId: "",
        imageUrl: ""
      }]
    }]
  }];

  en.validators = [{
    componentId: 868606,
    type: "EMAL",
    format: null,
    errorMessage: "Please enter a valid email address."
  }, {
    componentId: 868607,
    type: "CUST",
    format: "^(.{1,35})$",
    errorMessage: "Address is required and must not exceed 35 characters. Please abbreviate or use the second address field if needed."
  }, {
    componentId: 868608,
    type: "REQ",
    format: null,
    errorMessage: "Please enter your first name."
  }, {
    componentId: 868610,
    type: "REQ",
    format: null,
    errorMessage: "Please enter your city."
  }, {
    componentId: 868611,
    type: "REQ",
    format: null,
    errorMessage: "Please enter your last name."
  }, {
    componentId: 868612,
    type: "REQ",
    format: null,
    errorMessage: "Please select your state."
  }, {
    componentId: 868613,
    type: "REQ",
    format: null,
    errorMessage: "Please enter your postal code."
  }, {
    componentId: 868614,
    type: "CUST",
    format: "(^$|^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$)",
    errorMessage: "Please enter your phone number in the format XXX-XXX-XXXX, or leave this field blank."
  }, {
    componentId: 868615,
    type: "REQ",
    format: "",
    errorMessage: "Country is a mandatory form field."
  }, {
    componentId: 995316,
    type: "AMNT",
    format: "5~1000000",
    errorMessage: "Please enter at least 5.00. Do not enter a currency symbol."
  }, {
    componentId: 995320,
    type: "REQ",
    format: "",
    errorMessage: "ROI Source Code is a mandatory form field."
  }, {
    componentId: 1077552,
    type: "CUST",
    format: "^$",
    errorMessage: "This field must remain empty."
  }, {
    componentId: 1077553,
    type: "REQ",
    format: "",
    errorMessage: "captcha is a mandatory form field."
  }, {
    componentId: 1204539,
    type: "CUST",
    format: "^[\\d ]{15,19}$",
    errorMessage: "Please enter a valid credit card number."
  }, {
    componentId: 1204540,
    type: "REQ",
    format: "",
    errorMessage: "Payment type is a mandatory form field."
  }, {
    componentId: 1204541,
    type: "CUST",
    format: "^\\d{3,4}$",
    errorMessage: "Please enter a valid security code."
  }, {
    componentId: 1204542,
    type: "RNUM",
    format: null,
    errorMessage: "Please enter a valid bank routing number."
  }, {
    componentId: 1204543,
    type: "REQ",
    format: null,
    errorMessage: "Please enter a valid expiration date."
  }, {
    componentId: 1204544,
    type: "RNUM",
    format: null,
    errorMessage: "Please enter a valid bank account number."
  }];

  en.alerts = [{
    type: "MFE",
    content: "is a mandatory form field."
  }, {
    type: "PSO",
    content: "Unfortunately, it looks like this product is now sold out."
  }, {
    type: "GPE",
    content: "This transaction has failed as there has been an error in processing your payment."
  }];

  en.premiumGifts = {
    options: [{
      id: 939,
      clientId: 2253,
      optionTypeId: 183,
      createdOn: 1621539155000,
      name: "Cat card"
    }, {
      id: 873,
      clientId: 2253,
      optionTypeId: 174,
      createdOn: 1611861739000,
      name: "Large shirt"
    }, {
      id: 940,
      clientId: 2253,
      optionTypeId: 183,
      createdOn: 1621539155000,
      name: "Dog card"
    }, {
      id: 938,
      clientId: 2253,
      optionTypeId: 182,
      createdOn: 1620335414000,
      name: "Large shirt — Only size "
    }, {
      id: 874,
      clientId: 2253,
      optionTypeId: 174,
      createdOn: 1611861739000,
      name: "X-Large shirt"
    }, {
      id: 875,
      clientId: 2253,
      optionTypeId: 174,
      createdOn: 1611861739000,
      name: "Medium shirt"
    }, {
      id: 955,
      clientId: 2253,
      optionTypeId: 190,
      createdOn: 1631034625000,
      name: "Medium"
    }, {
      id: 957,
      clientId: 2253,
      optionTypeId: 190,
      createdOn: 1631034625000,
      name: "Large"
    }, {
      id: 956,
      clientId: 2253,
      optionTypeId: 190,
      createdOn: 1631034625000,
      name: "Small"
    }],
    rules: {
      single: {
        ranges: []
      },
      recurring: {
        ranges: [{
          limit: "1000000",
          productIds: []
        }]
      }
    },
    optionTypes: [{
      id: 174,
      clientId: 2253,
      createdOn: 1611861739000,
      name: "Size - Humane Hero t-shirt"
    }, {
      id: 182,
      clientId: 2253,
      createdOn: 1620335413000,
      name: "Size - Keep Calm shirt"
    }, {
      id: 183,
      clientId: 2253,
      createdOn: 1621539155000,
      name: "Tribute Card Version"
    }, {
      id: 190,
      clientId: 2253,
      createdOn: 1631034624000,
      name: "Test Premium Size"
    }],
    products: []
  };

  en.paymentGateways = [];

  en.feeCover = {
    feeCover: {
      type: "PERCENT",
      maxAmount: null,
      percent: "3",
      additionalAmount: null
    }
  };

  en.upsell = [];

  window.EngagingNetworks = en;
})();
