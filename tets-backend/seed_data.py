"""Skrypt do wypełnienia bazy danych przykładowymi danymi"""
from database import get_db, init_db, PostModel, CourseModel, UserModel
from datetime import datetime

def seed_data():
    """Wypełnij bazę danych przykładowymi danymi"""
    init_db()
    db = next(get_db())
    
    try:
        # Sprawdź czy dane już istnieją
        if db.query(PostModel).count() > 0 or db.query(CourseModel).count() > 0:
            print("Dane już istnieją w bazie. Pomijam seed.")
            return
        
        # Utwórz przykładowego użytkownika
        user = UserModel(
            name="Anna Kowalska",
            title="Learner & Explorer",
            avatar="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Utwórz przykładowe posty
        posts_data = [
            {
                "author_id": user.id,
                "author": "Dr. Maria Silva",
                "avatar": "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "title": "Neural Networks Course",
                "content": "Just published a new course on Neural Networks! 🚀\n\nThis comprehensive guide covers everything from basic perceptrons to advanced deep learning architectures. Perfect for intermediate learners looking to level up their AI skills.\n\nKey topics:\n• Understanding neural network architectures\n• Backpropagation and optimization\n• Real-world applications and case studies\n\nExcited to share this with the community!",
                "image": "https://images.unsplash.com/photo-1546430498-05c7b929830e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsYXB0b3B8ZW58MXx8fHwxNzYzMjk5MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "timestamp": datetime.now().isoformat(),
                "likes": 342
            },
            {
                "author_id": user.id,
                "author": "Prof. Jan Nowak",
                "avatar": "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "title": "React Patterns",
                "content": "5 React patterns every developer should know 💡\n\n1. Compound Components - Build flexible, reusable components\n2. Render Props - Share code between components\n3. Custom Hooks - Extract and reuse stateful logic\n4. HOCs - Add functionality to existing components\n5. Context + useReducer - Manage complex state\n\nWhich pattern do you use most often? Let me know in the comments!",
                "image": None,
                "timestamp": datetime.now().isoformat(),
                "likes": 567
            },
            {
                "author_id": user.id,
                "author": "Anna Wiśniewska",
                "avatar": "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "title": "UX Research",
                "content": "The importance of user research cannot be overstated 📊\n\nToo many designers jump straight into wireframes without understanding their users. Here's my process:\n\n✓ User interviews\n✓ Persona development\n✓ Journey mapping\n✓ Usability testing\n\nInvesting time in research upfront saves countless hours of revisions later. What's your UX research process?",
                "image": "https://images.unsplash.com/photo-1608120663152-fe60f4f55fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMHN0dWR5aW5nJTIwYm9va3N8ZW58MXx8fHwxNzYzMzY5NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "timestamp": datetime.now().isoformat(),
                "likes": 423
            }
        ]
        
        for post_data in posts_data:
            post = PostModel(**post_data)
            db.add(post)
        
        # Utwórz przykładowe kursy
        courses_data = [
            {
                "title": "Advanced React Patterns & Best Practices",
                "educator": "Prof. Jan Nowak",
                "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGNvZGluZ3xlbnwxfHx8fDE3NjMyOTkxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "duration": "8 weeks",
                "students": "15.4K",
                "rating": 4.9,
                "level": "Advanced",
                "price": "$99",
                "description": "Learn advanced React patterns and best practices"
            },
            {
                "title": "Machine Learning Fundamentals with Python",
                "educator": "Dr. Maria Silva",
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzMzcwNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "duration": "10 weeks",
                "students": "23.1K",
                "rating": 4.8,
                "level": "Intermediate",
                "price": "$129",
                "description": "Master machine learning fundamentals with Python"
            },
            {
                "title": "Complete UX Design Masterclass 2024",
                "educator": "Anna Wiśniewska",
                "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NjMzNzA2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "duration": "6 weeks",
                "students": "18.3K",
                "rating": 4.7,
                "level": "Beginner",
                "price": "$79",
                "description": "Complete guide to UX design in 2024"
            }
        ]
        
        for course_data in courses_data:
            course = CourseModel(**course_data)
            db.add(course)
        
        db.commit()
        print("Dane zostały pomyślnie dodane do bazy!")
        
    except Exception as e:
        db.rollback()
        print(f"Błąd podczas dodawania danych: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()

