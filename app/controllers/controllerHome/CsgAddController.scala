package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CsgAddController extends Controller {
    def csgAdd = Action{
        Ok(views.html.controllerHome.csg_add())
    }
}
