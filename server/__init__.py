from flask import Flask

app = Flask(__name__)
app.secret_key = 'z;\xfd\xc8\xed\x7f\x1e%EY\xae%%M\x07\x93\xf5L7\xd9\xb5%x\xa7\xd0'

import server.routes
