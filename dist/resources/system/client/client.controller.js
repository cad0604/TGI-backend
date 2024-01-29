import { ClientService } from './client.service.js';
export var ClientController;
(function (ClientController) {
    ClientController.Clients = async (req, res, next) => {
        try {
            res.status(200).json(await ClientService.Clients());
        }
        catch (e) {
            next(e);
        }
    };
})(ClientController || (ClientController = {}));
