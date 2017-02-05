# Stickerstack

## Project setup

**Install [pyenv](https://github.com/yyuu/pyenv)**
- `brew update`
- `brew install pyenv`

**Install [virtualenv](https://github.com/yyuu/pyenv-virtualenv)**
- `brew install pyenv-virtualenv`

**Add commands to bash**
- `vim ~/.bash_profile`
- Add these lines to the end of file and save:
    - `eval "$(pyenv init -)"`
    - `eval "$(pyenv virtualenv-init -)"`
- Reset bash: `source ~/.bash_profile`

**Install python**
- `pyenv install 3.5.0`
- `cd ~/path/to/project/`
- `pyenv virtualenv 3.5.0 stickerstack`

**Install requirements**
- `pip install -r requirements.txt`

**Start Flask**
- `. start_server`



## Project Structure

#### client
This is the frontend portion of the project. The main thing to remember is that `npm run build` will place the files
within `/server`. The dev build should work fine running tasks that aren't dependent on server code.

#### server
This is the backend portion of the project. Our Stripe integration will live here, along with any other server-side
code that we need written. On the production server, we'll use nginx and gunicorn to server the app. For now, Flask's
simple development server will work fine.
