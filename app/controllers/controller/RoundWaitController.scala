package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundWaitController extends Controller {
    def roundWait = Action{
        Ok(views.html.controller.round_wait())
    }
}
