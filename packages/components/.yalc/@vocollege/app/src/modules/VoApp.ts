import VoApi from './VoApi';
import VoConfig from './VoConfig';
import VoRouter from './VoRouter';

class VoApp {
    configure(config: any, routes: any) {
        VoConfig.setConfig(config);
        VoRouter.setRoutes(routes);
        VoApi.init();
    }
}
export default new VoApp();