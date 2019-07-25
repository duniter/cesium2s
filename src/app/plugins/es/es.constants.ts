import {exact, match} from "../../shared/functions";
import {DuniterRegexpStr} from "../../core/services/duniter/duniter.constants";
import {FormFieldType} from "../../shared/form/field.model";

export const EsOptions = {
    PEER_URL: {
        key: 'plugin.es.peerUrl',
        label: 'PLUGINS.ES.SETTINGS.PEER_URL',
        type: 'string' as FormFieldType
    },
    ENABLE_WOT_MIXED_SEARCH: {
        key: 'plugin.es.wot.mixedSearch',
        label: 'PLUGINS.ES.SETTINGS.ENABLE_WOT_MIXED_SEARCH',
        type: 'boolean' as FormFieldType,
        defaultValue: false // FIXME: enable mixed search
    }
};


export const EsEndpointApis = {
    CORE: "ES_CORE_API",
    USER: "ES_USER_API",
    SUBSCRIPTION: "ES_SUBSCRIPTION_API"
};


export const EsRegexpStr = {
    ES_USER_API_ENDPOINT: 'ES_USER_API( ([a-z_][a-z0-9-_.]*))?( ([0-9.]+))?( ([0-9a-f:]+))?( ([0-9]+))'
    //MAX_UPLOAD_BODY_SIZE: csConfig.plugins && csConfig.plugins.es && csConfig.plugins.es.maxUploadBodySize || 2097152 /*=2M*/
};
export const EsRegexp = {
    IMAGE_SRC: exact('data:([A-Za-z//]+);base64,(.+)'),
    URL: match('(www\\.|https?:\/\/(www\\.)?)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)'),
    HASH_TAG: match('(?:^|[\t\n\r\s ])#([\\wḡĞǦğàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+)'),
    USER_TAG: match('(?:^|[\t\n\r\s ])@(' + DuniterRegexpStr.USER_ID + ')'),
    ES_USER_API_ENDPOINT: match(EsRegexpStr.ES_USER_API_ENDPOINT)
}
