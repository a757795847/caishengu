package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ShoppingController extends Controller {
    def shopping = Action{
        Ok(views.html.controllerHome.shopping())
    }
}
