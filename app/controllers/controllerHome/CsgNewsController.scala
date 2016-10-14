package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CsgNewsController extends Controller {
    def csgNews = Action{
        Ok(views.html.controllerHome.csg_news())
    }
}