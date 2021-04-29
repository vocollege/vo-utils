// Vendors.
import axios from 'axios';

// Custom.
import GraphClient from '../VoApi/GraphClient';
import VoBase from '../VoBase';
import VoAuth from '../VoAuth';
import VoConfig from '../VoConfig';

class VoDocs extends VoBase {

    graphqlClient: any

    init() {
        this.graphqlClient = GraphClient.createGraphClient(this.getGraphqlUrl, true);
    }

    get getGraphqlUrl() {
        return VoConfig.get.DOCS_BASE_URL + '' + VoConfig.get.DOCS_GRAPHQL;
    }

    async getTemporaryFileUrl(id: string) {
        try {
            const url = `${this.getUrl}/docs/download/${id}`;
            return axios.get(url);
        } catch(error) {
            throw error;
        }
    }

    async downloadFile(id: string) {
        try {

            let elId = `file-${id}`;

            // Ensure that an old element is not left in the DOM.
            let el = document.getElementById(elId);
            if (el !== null && el.parentNode) {
                el.parentNode.removeChild(el);
            }

            // Retrieve the temporary download URL.
            let fileUrl = await this.getTemporaryFileUrl(id);
            if (fileUrl.data) {
                let anchor = document.createElement('a');
                anchor.id = elId;
                anchor.href = fileUrl.data;
                anchor.download = fileUrl.data;
                document.body.appendChild(anchor);
                anchor.click();
                setTimeout(() => {
                    if (anchor.parentNode) {
                        anchor.parentNode.removeChild(anchor);
                    }
                }, 500);
            } else {
                throw "No file was found";
            }
        } catch (error) {
            throw error;
        }
    }

}

export default new VoDocs('docs');
