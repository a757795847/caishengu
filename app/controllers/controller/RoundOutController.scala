package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundOutController extends Controller {
    def roundOut = Action{
        Ok(views.html.controller.round_out())
    }
}
