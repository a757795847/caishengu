package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CsgNewsAddController extends Controller {
    def csgNewsAdd = Action{
        Ok(views.html.controllerHome.csg_news_add())
    }
}
