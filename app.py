# app.py 
from flask import Flask, render_template, request, json
from flaskext.mysql import MySQL
import private

app = Flask(__name__)
mysql = MySQL()
 
# # MySQL configurations
app.config['MYSQL_DATABASE_USER'] = private.user
app.config['MYSQL_DATABASE_PASSWORD'] = private.password
app.config['MYSQL_DATABASE_DB'] = private.db
app.config['MYSQL_DATABASE_HOST'] = private.host

mysql.init_app(app)


@app.route("/")
def main():
	return render_template('landing.html')


@app.route('/createCaption', methods=['POST'])
def createCaption():
	pic =  request.form['picID']
	caption = request.form['caption']
	major = request.form['major']

	print(pic)
	print(caption)
	print(major)
	# open the connection with MySQL
	conn = mysql.connect()
	cursor = conn.cursor()

	# write the new info to the database
	cursor.execute("INSERT INTO captions (pic_id, pic, caption, major) VALUES (NULL, %s, %s, %s);", (pic, caption, major));

	conn.commit()
	
	return json.dumps({'caption':caption,'major':major})

