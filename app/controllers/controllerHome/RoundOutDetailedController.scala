package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class RoundOutDetailedController extends Controller {
    def roundOutDetailed = Action{
        Ok(views.html.controllerHome.round_out_detailed())
    }
}
