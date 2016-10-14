package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CreateNewsAddController extends Controller {
    def createNewsAdd = Action{
        Ok(views.html.controllerHome.create_news_add())
    }
}
