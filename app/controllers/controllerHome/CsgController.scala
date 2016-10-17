package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CsgController extends Controller {
    def csg = Action{
        Ok(views.html.controllerHome.csg())
    }
}