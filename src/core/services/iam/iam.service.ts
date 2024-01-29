import { Request } from 'express';
import { groupModel } from '../../../database/models/iam/group.model.js';
import { userCredentialsModel } from '../../../database/models/index.js';

export namespace IamService {
  export const group = {
    add: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }

        const newGroup = new groupModel(req.body);
        const saveGroup = await newGroup.save();
        if (saveGroup) {
          // Handle successful group creation
          return Promise.resolve({
            code: 201,
            success: true,
            message: 'Group created successfully',
            data: saveGroup,
          });
        } else {
          // Handle case where group creation failed
          return Promise.reject({
            code: 500,
            success: false,
            message: 'Failed to create group',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
    update: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
    remove: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
        const { _id } = req.body;
        if (!_id) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - Missing groupId in request body',
          });
        }
        const linked = await userCredentialsModel.find({});
        const deletionResult = await groupModel.deleteOne({ _id: _id });

        if (deletionResult.deletedCount > 0) {
          // Handle successful deletion
          return Promise.resolve({
            code: 200,
            success: true,
            message: 'Group deleted successfully',
          });
        } else {
          // Handle case where group deletion failed (groupId not found)
          return Promise.reject({
            code: 404,
            success: false,
            message: 'Group not found for deletion',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
    list: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
  };
  export const role = {
    create: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
    update: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
    remove: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
    list: async (req: Request) => {
      try {
        if (!req.body) {
          return Promise.reject({
            code: 400,
            success: false,
            message: 'Bad Request - No request body',
          });
        }
      } catch (e) {
        console.error(e);
        return Promise.reject({
          code: 500,
          success: false,
          message: 'Internal Server Error',
          error: e,
        });
      }
    },
  };
}
