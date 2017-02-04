# Stickerstack

## Project setup

- Install [pyenv](https://github.com/yyuu/pyenv)
    - `brew update`
    - `brew install pyenv`

- Install [virtualenv](https://github.com/yyuu/pyenv-virtualenv)
    - `brew install pyenv-virtualenv`

- Add commands to bash
    - `vim ~/.bash_profile`
    - Add these to end of file and save
        - `eval "$(pyenv init -)"`
        - `eval "$(pyenv virtualenv-init -)"`
    - Reset bash: `source ~/.bash_profile`

- Install python
    - `pyenv install 3.5.0`
    - Go to project root
    - `pyenv virtualenv 3.5.0 stickerstack`
    - "pyenv-virtualenv: activate stickerstack" should print if successful

- Install requirements
    - `pip install -r requirements.txt`

- Start Flask
    - In `/client` run `npm run build`
    - In project root, run `export FLASK_APP=runserver.py`
    - Start sever with `flask run`
    - Check http://127.0.0.1:5000/



## Project Structure

#### /client
This is the frontend portion of the project. The main thing to remember is that `npm run build` will place the files
within `/server`. The dev build should work fine running tasks that aren't dependent on server code.

#### /server
This is the backend portion of the project. Our Stripe integration will live here, along with any other server-side
code that we need written. On the production server, we'll use nginx and gunicorn to server the app. For now, Flask's
simple development server will work fine.
