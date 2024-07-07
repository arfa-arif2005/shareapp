# app.py

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'qlite:////tmp/test.db'
db = SQLAlchemy(app)

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

@app.route('/api/blogs', methods=['GET'])
def get_blog_posts():
    blog_posts = BlogPost.query.all()
    return jsonify([{'title': bp.title, 'content': bp.content, 'author': bp.author, 'date': bp.date} for bp in blog_posts])

@app.route('/api/blogs', methods=['POST'])
def create_blog_post():
    data = request.get_json()
    blog_post = BlogPost(title=data['title'], content=data['content'], author=data['author'])
    db.session.add(blog_post)
    db.session.commit()
    return jsonify({'message': 'Blog post created successfully'})

# User authentication (optional)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'})

if __name__ == '__main__':
    app.run(debug=True)