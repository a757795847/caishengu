package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class UserController extends Controller {
    def user = Action{
        Ok(views.html.controller.user())
    }
}
