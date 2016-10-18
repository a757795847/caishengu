package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class UserDetailedController extends Controller {
    def userDetailed = Action{
        Ok(views.html.controller.user_detailed())
    }
}
