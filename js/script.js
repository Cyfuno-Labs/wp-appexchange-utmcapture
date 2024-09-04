jQuery(document).ready(function($) {

    // default number of days to store the cookie
    let cookie_expiry_days = 60;

    // function to get query string parameter
    let getParameterByName = function(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        let paramValue = decodeURIComponent(results[2].replace(/\+/g, ' '));
        Cookies.set(name, paramValue, { expires: cookie_expiry_days, secure: true });
        return paramValue;
    };

    // get UTM parameters from query string
    let utm_source = getParameterByName('utm_source') ?? Cookies.get('utm_source');
    let utm_medium = getParameterByName('utm_medium') ?? Cookies.get('utm_medium');
    let utm_campaign = getParameterByName('utm_campaign') ?? Cookies.get('utm_campaign');
    let utm_term = getParameterByName('utm_term') ?? Cookies.get('utm_term');
    let utm_content = getParameterByName('utm_content') ?? Cookies.get('utm_content');

    // look for any URLs to the appexchange to add UTM parameters if they dont exist, or replace them if they do
    if(utm_source || utm_medium || utm_campaign || utm_term || utm_content) {
        // console.log('found UTM parameters in query string, updating appexchange URLs');
        $('a[href*="https://appexchange.salesforce.com/appxListingDetail"]').each(function() {
            let href = $(this).attr('href');
            let new_href = href.substring(0, href.indexOf('&utm') > -1 ? href.indexOf('&utm') : href.length);

            if(utm_source) new_href += '&utm_source=' + utm_source;
            if(utm_medium) new_href += '&utm_medium=' + utm_medium;
            if(utm_campaign) new_href += '&utm_campaign=' + utm_campaign;
            if(utm_term) new_href += '&utm_term=' + utm_term;
            if(utm_content) new_href += '&utm_content=' + utm_content;

            // console.log('updating href from ' + href + ' to ' + new_href);
            $(this).attr('href', new_href);
        });
    }
});