package controllers
import play.api.mvc._
/**
  * Created by zlm on 16/10/28.
  */
class LiveController extends Controller {
    def index = Action{
        Ok(views.html.live.live_index())
    }
    def add = Action{
        Ok(views.html.live.live_add())
    }
}