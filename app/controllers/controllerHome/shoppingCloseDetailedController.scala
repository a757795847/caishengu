package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ShoppingCloseDetailedController extends Controller {
    def shoppingCloseDetailed = Action{
        Ok(views.html.controllerHome.shopping_close_detailed())
    }
}