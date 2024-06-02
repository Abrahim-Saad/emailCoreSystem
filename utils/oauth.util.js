const msal = require('@azure/msal-node');

const msalConfig = {
    auth: {
        clientId: process.env.OUTLOOK_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

const oauthScopes = ["https://graph.microsoft.com/.default"];
const redirectUri = process.env.OUTLOOK_REDIRECT_URI;

exports.generateOAuthUrl = async (req, res) => {
    const authCodeUrlParameters = {
        scopes: oauthScopes,
        redirectUri: redirectUri,
    };

    cca.getAuthCodeUrl(authCodeUrlParameters)
        .then((response) => { return res.redirect(response) })
        .catch((error) => {
            console.log(JSON.stringify(error));
            return res.status(500).send('Error generating authorization URL');
        });
};


exports.acquireTokenByCode = (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: oauthScopes,
        redirectUri: redirectUri,
    };

    cca.acquireTokenByCode(tokenRequest)
        .then((response) => {
            const userData = {
                outlookId: response.account.homeAccountId,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                email: response.account.username,
            };

            esClient.index({
                index: 'users',
                id: userData.outlookId,
                body: userData
            }).then(() => {
                res.send('User authenticated and data saved');
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Error saving user data');
            });
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            res.status(500).send('Error during token acquisition');
        });
};
