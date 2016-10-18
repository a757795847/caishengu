package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ShoppingFrameDetailedController extends Controller {
    def shoppingFrameDetailed = Action{
        Ok(views.html.controller.shopping_frame_detailed())
    }
}