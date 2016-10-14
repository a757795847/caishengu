package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ItemOutDetailedController extends Controller {
    def itemOutDetailed = Action{
        Ok(views.html.controllerHome.item_out_detailed())
    }
}