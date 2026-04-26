from rest_framework.views import APIView
from applications.models import JobApplication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class SummaryAnalytics(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        qs = JobApplication.objects.filter(user=user)

        total = qs.count()
        interview = qs.filter(status="interview").count()
        offers = qs.filter(status="offer").count()
        rejected = qs.filter(status="rejected").count()

        interview_rate = (interview / total * 100) if total > 0 else 0
        offer_rate = (offers / total * 100) if total > 0 else 0

        return Response(
            {
                "total_applications": total,
                "interviews": interview,
                "offers": offers,
                "rejections": rejected,
                "interview_rate": round(interview_rate, 2),
                "offer_rate": round(offer_rate, 2),
            }
        )
