from server import app
from flask import request, redirect, render_template, url_for
from server.tasks.order import create_order


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/order', methods=['POST'])
def order():
    data = request.get_json()
    return create_order(data)
