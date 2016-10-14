package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/14.
  */
class TributeFrameDetailedController extends Controller {
    def tributeFrameDetailed = Action{
        Ok(views.html.controllerHome.tribute_frame_detailed())
    }
}
