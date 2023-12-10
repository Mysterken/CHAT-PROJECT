<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function index(
        Request                        $request,
        UserRepository                 $userRepository,
        PasswordHasherFactoryInterface $passwordHasherFactory
    ): Response
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return $this->json(['message' => 'Invalid credentials'], Response::HTTP_BAD_REQUEST);
        }

        $passwordHasher = $passwordHasherFactory->getPasswordHasher($user);

        if (!$passwordHasher->verify($user->getPassword(), $password)) {
            return $this->json(['message' => 'Invalid credentials'], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            'message' => 'You are now logged in',
            'user' => $user->getId(),
            'username' => $user->getUsername()
        ]);
    }

    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(
        Request                        $request,
        UserRepository                 $userRepository,
        PasswordHasherFactoryInterface $passwordHasherFactory,
        EntityManagerInterface         $entityManager
    ): Response
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        $user = $userRepository->findOneBy(['email' => $email]);

        if ($user) {
            return $this->json(['message' => 'This email is already used'], Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user
            ->setEmail($email)
            ->setUsername($username)
            ->setRoles(['ROLE_USER']);

        $passwordHasher = $passwordHasherFactory->getPasswordHasher($user);
        $user->setPassword($passwordHasher->hash($password));

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'You are now registered',
            'user' => $user->getId(),
            'username' => $user->getUsername()
        ], Response::HTTP_CREATED);
    }
}
