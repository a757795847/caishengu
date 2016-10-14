package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundManageAddController extends Controller {
    def roundManageAdd = Action{
        Ok(views.html.controllerHome.round_manage_add())
    }
}
