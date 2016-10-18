package controllers
import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/17.
  */
class ShelfController extends Controller{
    def shelf = Action{
        Ok(views.html.Shelf_details())

    }

}
