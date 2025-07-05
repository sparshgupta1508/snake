import pygame
import random
import sys

pygame.init()


DARK_BG = (20, 20, 20)
SNAKE_COLOR = (0, 200, 0)
FOOD_COLOR = (200, 0, 0)
TEXT_COLOR = (255, 255, 255)


WIDTH, HEIGHT = 600, 400
CELL_SIZE = 20

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sparsh's Snake Game ")

clock = pygame.time.Clock()
FPS = 12

font = pygame.font.SysFont("consolas", 28, bold=True)

def show_score(score):
    score_surface = font.render(f'Score: {score}', True, TEXT_COLOR)
    screen.blit(score_surface, (10, 10))

def game_over_screen(score):
    screen.fill(DARK_BG)
    over_surface = font.render(f'Game Over! Score: {score}', True, TEXT_COLOR)
    over_rect = over_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2 - 20))
    screen.blit(over_surface, over_rect)

    retry_surface = font.render(f'Press C to Play Again or Q to Quit', True, TEXT_COLOR)
    retry_rect = retry_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 20))
    screen.blit(retry_surface, retry_rect)

    pygame.display.flip()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    pygame.quit()
                    sys.exit()
                elif event.key == pygame.K_c:
                    main()

def start_screen():
    screen.fill(DARK_BG)
    title_surface = font.render("Sparsh's Snake Game", True, TEXT_COLOR)
    title_rect = title_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2 - 30))
    screen.blit(title_surface, title_rect)

    start_surface = font.render("Press S to Start", True, TEXT_COLOR)
    start_rect = start_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 20))
    screen.blit(start_surface, start_rect)

    pygame.display.flip()

    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_s:
                    waiting = False

def main():
    x = WIDTH // 2
    y = HEIGHT // 2
    dx = CELL_SIZE
    dy = 0

    snake = [[x, y]]
    length = 1

    food = [random.randrange(0, WIDTH, CELL_SIZE), random.randrange(0, HEIGHT, CELL_SIZE)]
    score = 0

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP and dy == 0:
                    dx, dy = 0, -CELL_SIZE
                elif event.key == pygame.K_DOWN and dy == 0:
                    dx, dy = 0, CELL_SIZE
                elif event.key == pygame.K_LEFT and dx == 0:
                    dx, dy = -CELL_SIZE, 0
                elif event.key == pygame.K_RIGHT and dx == 0:
                    dx, dy = CELL_SIZE, 0

        x += dx
        y += dy
        head = [x, y]
        snake.append(head)

        if len(snake) > length:
            snake.pop(0)

        if x < 0 or x >= WIDTH or y < 0 or y >= HEIGHT:
            game_over_screen(score)

        for segment in snake[:-1]:
            if segment == head:
                game_over_screen(score)

        if x == food[0] and y == food[1]:
            food = [random.randrange(0, WIDTH, CELL_SIZE), random.randrange(0, HEIGHT, CELL_SIZE)]
            length += 1
            score += 1

        screen.fill(DARK_BG)
        for segment in snake:
            pygame.draw.rect(screen, SNAKE_COLOR, (*segment, CELL_SIZE, CELL_SIZE))
        pygame.draw.rect(screen, FOOD_COLOR, (*food, CELL_SIZE, CELL_SIZE))

        show_score(score)
        pygame.display.flip()
        clock.tick(FPS)


start_screen()
main()
