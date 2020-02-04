import * as Yup from 'yup';

import Plan from '../models/Plan';
import User from '../models/User';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'price', 'duration'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const checkUserIdAdmin = await User.findOne({
      where: { id: req.userId, is_admin: true },
    });

    if (!checkUserIdAdmin) {
      return res.status(401).json({ error: 'User is not a admin' });
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { planId } = req.params;
    const plan = await Plan.findByPk(planId);

    if(!plan) {
      return res.status(404).json({ error: 'This plan does not exists!' });
    }

    const { title } = plan;
    await plan.destroy();

    return res.json({ message: `Plan ${title} was deleted` });
  }

}

export default PlanController;
