package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CreateAddController extends Controller {
    def createNews = Action{
        Ok(views.html.controller.create_add())
    }
}
