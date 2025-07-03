const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// support environment variables
const Dotenv = require("dotenv-webpack");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
});
// Generate a version of the branch name that we can tag on to the end of the
// output file name.
const branchNameForOutputFile = gitRevisionPlugin
  .branch()
  .replace(/(in-progress\/)/, "")
  .replaceAll("/", "-");

const sharedModule = {
  rules: [
    {
      test: /\.(svg|png|jpg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "images"
        }
      },
    },
    {
      test: /\.(ts|js)x?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/preset-typescript"],
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
            "@babel/plugin-transform-runtime"
          ]
        }
      }
    },
    {
      test: /\.(html)$/,
      use: {
        loader: "html-loader",
        options: {
          minimize: false,
          sources: false
        }
      }
    }
  ]
};

module.exports = {
  entry: {
    common: "./src/common/assets/js/app.js",
    donation: {
      import: "./src/donation/assets/js/app.js",
    },
    advocacy: {
      import: "./src/advocacy/assets/js/app.js",
    },
    surveys: {
      import: "./src/surveys/assets/js/app.js",
    },
    events: {
      import: "./src/events/assets/js/app.js",
    },
    splash: {
      import: "./src/splash/assets/js/app.js",
    },
    "legislative-lookup": {
      import: "./src/legislative-lookup/assets/js/app.js",
    },
    thehub: {
      import: "./src/thehub/assets/js/app.js",
    },
    ecards: {
      import: "./src/ecards/assets/js/app.js",
    }
  },
  output: {
    filename: `[name]/js/[name]-${branchNameForOutputFile}.js`,
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
    }),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "common/pageassets/"),
          to: "pageassets/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "common/widgets/"),
          to: "page/widget/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "donation/static/"),
          to: "donation/html/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "advocacy/static/"),
          to: "advocacy/html/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "surveys/static/"),
          to: "surveys/html/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "splash/static/"),
          to: "splash/html/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "ecards/static/"),
          to: "ecards/html/",
        },
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "legislative-lookup/static/"),
          to: "legislative-lookup/html/",
        },
      ],
    }),
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(
        // We don't want the in-progress folder name to show up in the branch
        // name.
        gitRevisionPlugin.branch().replace(/in-progress\//, "")
      ),
      LASTCOMMITDATETIME: JSON.stringify(
        gitRevisionPlugin.lastcommitdatetime()
      ),
    }),
    new HtmlWebpackPlugin({
      title: "Project Index",
      filename: "index.html",
      template: "./src/common/html/pages/index.html",
      chunks: ["common"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Premium Donation Form",
      filename: "donation/html/premium-donation.html",
      template: "./src/donation/html/pages/premium-donation.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Premium Donation Form—Condished Ask Array",
      filename:
        "donation/html/premium-donation-evergreen-dev-condish-array.html",
      template:
        "./src/donation/html/pages/premium-donation-evergreen-dev-condish-array.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Premium Donation Form — Two Premiums",
      filename: "donation/html/premium-donation-two-premiums.html",
      template: "./src/donation/html/pages/premium-donation-two-premiums.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Donation Form — One-Time Only — No Premiums",
      filename: "donation/html/donation-one-time-only-no-premium.html",
      template:
        "./src/donation/html/pages/donation-one-time-only-no-premium.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Donation Form — Symbolic Gifts",
      filename: "donation/html/donation-symbolic-gifts.html",
      template: "./src/donation/html/pages/donation-symbolic-gifts.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Memorial Donation Page",
      filename: "donation/html/memorial-donation.html",
      template: "./src/donation/html/pages/memorial-donation.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Premium Donation Page—DM House File",
      filename: "donation/html/hsus-premium-donation-house-file.html",
      template:
        "./src/donation/html/pages/hsus-premium-donation-house-file.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "WLT Donation Form",
      filename: "donation/html/wlt-donation.html",
      template: "./src/donation/html/pages/wlt-donation.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "WLT Premium Donation Form",
      filename: "donation/html/wlt-premium-donation.html",
      template: "./src/donation/html/pages/wlt-premium-donation.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "WLT Donation Thanks Page",
      filename: "donation/html/wlt-donation-thanks.html",
      template: "./src/donation/html/pages/wlt-donation-thanks.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Donation Thanks Page",
      filename: "donation/html/donation-thanks.html",
      template: "./src/donation/html/pages/donation-thanks.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Donation Form",
      filename: "donation/html/hsi-donation.html",
      template: "./src/donation/html/pages/hsi-donation.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Donation Form—UK",
      filename: "donation/html/hsi-donation-uk.html",
      template: "./src/donation/html/pages/hsi-donation-uk.html",
      chunks: ["donation"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Email to Target Page",
      filename: "advocacy/html/email-to-target.html",
      template: "./src/advocacy/html/pages/email-to-target.html",
      chunks: ["advocacy"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Email to Target with Counter",
      filename: "advocacy/html/hsus-email-to-target-counter.html",
      template: "./src/advocacy/html/pages/hsus-email-to-target-counter.html",
      chunks: ["advocacy"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Closed Landing Page",
      filename: "advocacy/html/closed-landing-page-hsus.html",
      template: "./src/advocacy/html/pages/closed-landing-page-hsus.html",
      chunks: ["advocacy"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Closed Landing Page",
      filename: "advocacy/html/closed-landing-page-hsi.html",
      template: "./src/advocacy/html/pages/closed-landing-page-hsi.html",
      chunks: ["advocacy"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Email to Target Page",
      filename: "advocacy/html/hsi-email-to-target.html",
      template: "./src/advocacy/html/pages/hsi-email-to-target.html",
      chunks: ["advocacy"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Petition Page—with Counter",
      filename: "advocacy/html/hsi-petition-counter.html",
      template: "./src/advocacy/html/pages/hsi-petition-counter.html",
      chunks: ["advocacy"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Signup Page—Main",
      filename: "surveys/html/signup-main-hsus.html",
      template: "./src/surveys/html/pages/hsus/signup-main-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Signup Page—Web Site Iframe",
      filename: "surveys/html/signup-hsus-web-site-iframe.html",
      template:
        "./src/surveys/html/pages/hsus/signup-hsus-web-site-iframe.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Survey Page—APL Member Survey",
      filename: "surveys/html/survey-apl-member-hsus.html",
      template: "./src/surveys/html/pages/hsus/survey-apl-member-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Survey Page—All Animals Reader Survey",
      filename: "surveys/html/survey-all-animals-hsus.html",
      template: "./src/surveys/html/pages/hsus/survey-all-animals-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Signup Page—HumanePro Standalone",
      filename: "surveys/html/signup-humanepro-standalone-hsus.html",
      template:
        "./src/surveys/html/pages/hsus/signup-humanepro-standalone-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Signup Page—HumanePro Iframe",
      filename: "surveys/html/signup-humanepro-iframe-hsus.html",
      template:
        "./src/surveys/html/pages/hsus/signup-humanepro-iframe-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Survey Page—Dog Personality Quiz",
      filename: "surveys/html/survey-dog-personality-quiz-hsus.html",
      template:
        "./src/surveys/html/pages/hsus/survey-dog-personality-quiz-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Survey Thanks Page",
      filename: "surveys/html/signup-thanks-hsus.html",
      template: "./src/surveys/html/pages/hsus/signup-thanks-hsus.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Signup Page",
      filename: "surveys/html/signup-hsi-main.html",
      template: "./src/surveys/html/pages/hsi/signup-hsi-main.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Signup Page—SMS",
      filename: "surveys/html/signup-hsi-sms.html",
      template: "./src/surveys/html/pages/hsi/signup-hsi-sms.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Signup Page—Web Site Iframe",
      filename: "surveys/html/signup-hsi-web-site-iframe.html",
      template: "./src/surveys/html/pages/hsi/signup-hsi-web-site-iframe.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Birthday Signup Page",
      filename: "surveys/html/signup-birthday-hsi.html",
      template: "./src/surveys/html/pages/hsi/signup-birthday-hsi.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Birthday Signup Thanks Page",
      filename: "surveys/html/signup-birthday-thanks-hsi.html",
      template: "./src/surveys/html/pages/hsi/signup-birthday-thanks-hsi.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Legacy Will Signup Page",
      filename: "surveys/html/signup-hsi-legacy-will.html",
      template: "./src/surveys/html/pages/hsi/signup-hsi-legacy-will.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI SMS Signup Thanks Page",
      filename: "surveys/html/signup-sms-thanks-hsi.html",
      template: "./src/surveys/html/pages/hsi/signup-sms-thanks-hsi.html",
      chunks: ["surveys"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Splash Page Template",
      filename: "splash/html/splash-template.html",
      template: "./src/splash/html/pages/splash-template.html",
      chunks: ["splash"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSUS Legislative Lookup Page",
      filename: "legislative-lookup/html/legislative-lookup.html",
      template: "./src/legislative-lookup/html/pages/legislative-lookup.html",
      chunks: ["legislative-lookup"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "HSI Donor Care Standalone Ecard Page",
      filename: "ecards/html/hsi-ecard-standalone.html",
      template: "./src/ecards/html/pages/hsi-ecard-standalone.html",
      chunks: ["ecards"],
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
  ],
  module: sharedModule,
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      utils: path.resolve(__dirname, "src/common/assets/js/utils"),
      commonComponents: path.resolve(
        __dirname,
        "src/common/assets/js/components"
      ),
      donationComponents: path.resolve(
        __dirname,
        "src/donation/assets/js/components"
      ),
      commonHelpers: path.resolve(__dirname, "src/common/assets/js/helpers"),
      commonStyles: path.resolve(__dirname, "src/common/assets/scss"),
      commonEvents: path.resolve(__dirname, "src/common/assets/ts/events"),
    },
  },
};
