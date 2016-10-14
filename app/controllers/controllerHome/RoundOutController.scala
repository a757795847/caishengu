package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundOutController extends Controller {
    def roundOut = Action{
        Ok(views.html.controllerHome.round_out())
    }
}
