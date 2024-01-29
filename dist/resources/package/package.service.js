import { PackageModel } from '../../database/models/index.js';
export var PackageService;
(function (PackageService) {
    PackageService.PackageAdd = async (req, res) => {
        try {
            const existingPackage = await PackageModel.MPackageModel.findOne({
                name: req?.body?.name,
            });
            if (existingPackage) {
                return Promise.reject({
                    code: 409,
                    Success: false,
                    message: 'Package with the same name already exists',
                });
            }
            if (req?.body?.module == 'PCR') {
                const limitModulePcr = await PackageModel.MPackageModel.find({
                    module: req?.body?.module,
                });
                if (limitModulePcr.length >= 3) {
                    return Promise.reject({
                        code: 409,
                        Success: false,
                        message: 'Maximum 3 Packages Crossed ',
                    });
                }
            }
            const newPackage = new PackageModel.MPackageModel(req?.body);
            const savedPackage = await newPackage.save();
            return Promise.resolve({
                code: 201,
                Success: true,
                message: 'Package added successfully',
                data: savedPackage,
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
    PackageService.PackageUpdate = async (req, res) => {
        try {
            const packageId = req.params.id;
            const existingPackage = await PackageModel.MPackageModel.findById(packageId);
            if (!existingPackage) {
                return Promise.reject({
                    code: 404,
                    Success: false,
                    message: 'Package not found',
                });
            }
            // If the package exists, update its properties
            Object.assign(existingPackage, req.body);
            const updatedPackage = await existingPackage.save();
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Package updated successfully',
                data: updatedPackage,
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
    PackageService.PackageList = async () => {
        try {
            const Find = await PackageModel.MPackageModel.aggregate([
                {
                    $match: {
                        module: 'PCR',
                        status: '1',
                    },
                },
                {
                    $project: {
                        'pricing._id': 0,
                        'bulletPoints._id': 0,
                    },
                },
                {
                    $sort: {
                        'pricing.basePrice': -1,
                    },
                },
            ]).allowDiskUse(true);
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Package get successfully',
                data: Find,
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
})(PackageService || (PackageService = {}));
