from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
import logging

# Get the custom user model
CustomUser = get_user_model()

# Configure logging for debugging email issues
logger = logging.getLogger(__name__)

@receiver(post_save, sender=CustomUser)
def user_post_save(sender, instance, created, **kwargs):
    """ Signal to confirm user creation & send a welcome email """
    if created:
        print(f"✅ New user created: {instance.username}")

        subject = "Welcome to [Your Healthcare Platform]! 🌿"

        message = f"""
        Hi {instance.username},  

        Welcome to [Your Healthcare Platform]! We’re excited to have you on board. 🌟  

        Our goal is to help you take charge of your health with reliable insights and tools, including:  

        ✅ **Symptom Checker** – Get quick insights based on your symptoms.  
        ✅ **Medical Report Analysis** – Upload reports and get AI-powered insights.  
        ✅ **Healthcare Tips** – Personalized health recommendations for a better lifestyle.  

        Remember, early detection and preventive care are key to staying healthy! 💙  

        Start exploring now: [Your Website URL]  

        Stay healthy and take care!  
        
        Best Regards,  
        **Your Support Team**  
        """

        html_message = f"""
        <p>Hi <strong>{instance.username}</strong>,</p>
        <p>Welcome to <strong>[Your Healthcare Platform]</strong>! We’re excited to have you on board. 🌟</p>

        <p>Our goal is to help you take charge of your health with reliable insights and tools:</p>

        <ul>
            <li>✅ <strong>Symptom Checker</strong> – Get quick insights based on your symptoms.</li>
            <li>✅ <strong>Medical Report Analysis</strong> – Upload reports and receive AI-powered insights.</li>
            <li>✅ <strong>Healthcare Tips</strong> – Personalized health recommendations for a better lifestyle.</li>
        </ul>

        <p>Remember, early detection and preventive care are key to staying healthy! 💙</p>

        <p><a href="[Your Website URL]" style="color: blue; font-weight: bold;">Start exploring now</a>!</p>

        <p>Stay healthy and take care! 😊</p>

        <p><strong>Best Regards,</strong><br>Your Support Team</p>
        """

        from_email = "bnanda405@gmail.com"  # Ensure this is set in settings.py
        recipient_list = [instance.email]

        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=False, html_message=html_message)
            print(f"📧 Welcome email sent to {instance.email}")
        except Exception as e:
            logger.error(f"🚨 Failed to send welcome email to {instance.email}: {e}")
