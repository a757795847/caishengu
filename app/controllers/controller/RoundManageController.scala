package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundManageController extends Controller {
    def roundManage = Action{
        Ok(views.html.controller.round_manage())
    }
}
