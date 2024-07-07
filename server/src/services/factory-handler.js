const errors = require("../utils/response");

exports.createOne = (Model) => async (req, res) => {
  const document = await Model.create(req.body);
  res.success({ data: document });
};

exports.getOne = (Model) => async (req, res, next) => {
  const document = await Model.findById(req.params.id);

  if (!document) return next(errors.recordNotFound());

  res.success({ data: document });
};

exports.getAll = (Model) => async (req, res) => {
  const documents = await Model.find();
  res.success({ data: documents });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!document) return next(errors.recordNotFound());

  res.success({ data: document });
};

exports.deleteOne = (Model) => async (req, res, next) => {
  const document = await Model.findByIdAndDelete(req.params.id);

  if (!document) return next(errors.recordNotFound());

  res.success();
};
