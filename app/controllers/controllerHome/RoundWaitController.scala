package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundWaitController extends Controller {
    def roundWait = Action{
        Ok(views.html.controllerHome.round_wait())
    }
}
