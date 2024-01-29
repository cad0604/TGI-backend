import { PaymentService } from './payment.service.js';
export var PaymentController;
(function (PaymentController) {
    PaymentController.Initiate = async (req, res, next) => {
        try {
            res.status(201).json(await PaymentService.Initiate(req, res));
        }
        catch (e) {
            next(e);
        }
    };
})(PaymentController || (PaymentController = {}));
