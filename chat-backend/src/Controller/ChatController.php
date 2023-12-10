<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Exception\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/api/chat/{userId}/{otherUserId}', name: 'app_chat')]
    public function index(int $userId, int $otherUserId, MessageRepository $messageRepository): Response
    {
        $messages = $messageRepository->findMessagesByUsers($userId, $otherUserId);

        return $this->json($messages);
    }

    /**
     * @throws ORMException
     */
    #[Route('/api/chat/{userId}/send', name: 'app_chat_send', methods: ['POST'])]
    public function send(int $userId, Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager): Response
    {
        // get user by $userId
        $user = $userRepository->find($userId);

        $data = json_decode($request->getContent(), true);

        // the request body should contain a "content" key and a "receiver" key
        if (!$content = $data['content'] ?? null) {
            return $this->json(['message' => 'The "content" key is missing'], Response::HTTP_BAD_REQUEST);
        }

        if (!$receiverId = $data['receiver'] ?? null) {
            return $this->json(['message' => 'The "receiver" key is missing'], Response::HTTP_BAD_REQUEST);
        }

        $receiver = $userRepository->find($receiverId);

        $message = new Message();
        $message
            ->setAuthor($user)
            ->setReceiver($receiver)
            ->setContent($content)
            ->setDate(new \DateTime());

        $entityManager->persist($message);
        $entityManager->flush();

        return $this->json(['message' => 'The message was successfully sent'], Response::HTTP_CREATED);
    }
}
