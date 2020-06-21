import json

from notebook.notebookapp import NotebookWebApplication, NotebookApp
from notebook.utils import url_path_join
from notebook.base.handlers import APIHandler

from tornado import web
from tornado.log import app_log


def _jupyter_server_extension_paths():
    return [{"module": "simple_server_extension"}]


def load_jupyter_server_extension(notebook_app: NotebookApp):
    setup_handlers(notebook_app.web_app)


def setup_handlers(web_app: NotebookWebApplication) -> None:
    host_pattern = ".*$"
    web_app.add_handlers(
        host_pattern,
        [
            (
                url_path_join(
                    web_app.settings["base_url"],
                    "/simple-server-extension",
                ),
                MyAPIHandler,
            )
        ]
    )


DATA = ''


class MyAPIHandler(APIHandler):
    def check_xsrf_cookie(self):
        pass

    @web.authenticated
    def get(self) -> None:
        app_log.info('GET request received')
        self.finish(
            json.dumps(
                {
                    "message": ["hello", "world"],
                    "data": DATA,
                }
            )
        )

    @web.authenticated
    def post(self) -> None:
        data = json.loads(self.request.body.decode("utf-8"))
        global DATA
        DATA = data
        app_log.info('Data received.')

        self.finish(
            json.dumps(
                {
                    "status": "completed",
                    "data": DATA
                }
            )
        )
