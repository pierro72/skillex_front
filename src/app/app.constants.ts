import { environment } from '../environments/environment';


    /* tslint:disable */
    let _VERSION = '1.0.4';
    let _DEBUG_INFO_ENABLED = true;
    let _SERVER_API_URL     = environment.api;
    let _SERVER_IHNI_URL    = environment.ihni;
    let _QUB_HEADER_CSS     = environment.qubHeader+"/js/qubHeader.min.css";
    let _QUB_HEADER_JS      = environment.qubHeader+"/js/qubHeader.min.js";
    let _AUTH_IHNI_URL      = environment.ihni+"/api/authme"
    
    
    /* @toreplace VERSION */
    /* @toreplace DEBUG_INFO_ENABLED */
    /* @toreplace SERVER_API_URL */
    /* tslint:enable */
    export const VERSION = _VERSION;
    export const DEBUG_INFO_ENABLED = _DEBUG_INFO_ENABLED;
    export const SERVER_API_URL     = _SERVER_API_URL;
    export const SERVER_IHNI_URL    = _SERVER_IHNI_URL;
    export const AUTH_IHNI_URL      = _AUTH_IHNI_URL;
    export const QUB_HEADER_CSS     = _QUB_HEADER_CSS;
    export const QUB_HEADER_JS      = _QUB_HEADER_JS;
    export const APP_NAME           = 'Skillex';
    export const TIMEOUT_DEFAUT     = 2000;
    export const TIMEOUT_SUCCES     = 2000;
    export const TIMEOUT_WARNING    = 3000;
    export const TIMEOUT_ERRORS     = 5000;
 
