package controllers
import play.api.mvc._
/**
  * Created by zlm on 16/10/28.
  */
class TrendsController extends Controller {
    def index = Action{
        Ok(views.html.trends.trends_index())
    }
    def add = Action{
        Ok(views.html.trends.trends_add())
    }
}
