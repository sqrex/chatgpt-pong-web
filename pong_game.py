from pyjsdl import Pyjsdl as pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

WIDTH, HEIGHT = 640, 480
PADDLE_WIDTH, PADDLE_HEIGHT = 10, 60
PADDLE_SPEED = 5
BALL_WIDTH, BALL_HEIGHT = 10, 10
BALL_SPEED_X = 4
BALL_SPEED_Y = 4

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Pong Game')

player_paddle = pygame.Rect(WIDTH - 20, HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
ai_paddle = pygame.Rect(10, HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
ball = pygame.Rect(WIDTH // 2 - BALL_WIDTH // 2, HEIGHT // 2 - BALL_HEIGHT // 2, BALL_WIDTH, BALL_HEIGHT)

ball_dx = BALL_SPEED_X
ball_dy = BALL_SPEED_Y

def game_loop():
    global ball_dx, ball_dy

    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP] and player_paddle.top > 0:
        player_paddle.move_ip(0, -PADDLE_SPEED)
    if keys[pygame.K_DOWN] and player_paddle.bottom < HEIGHT:
        player_paddle.move_ip(0, PADDLE_SPEED)

    if ai_paddle.centery < ball.centery:
        ai_paddle.move_ip(0, PADDLE_SPEED)
    else:
        ai_paddle.move_ip(0, -PADDLE_SPEED)

    ball.move_ip(ball_dx, ball_dy)

    if ball.top <= 0 or ball.bottom >= HEIGHT:
        ball_dy = -ball_dy

    if ball.colliderect(player_paddle) or ball.colliderect(ai_paddle):
        ball_dx = -ball_dx

    if ball.left <= 0 or ball.right >= WIDTH:
        ball.center = (WIDTH // 2, HEIGHT // 2)
        ball_dx = -ball_dx

    screen.fill(BLACK)
    pygame.draw.rect(screen, WHITE, player_paddle)
    pygame.draw.rect(screen, WHITE, ai_paddle)
    pygame.draw.ellipse(screen, WHITE, ball)
    pygame.draw.aaline(screen, WHITE, (WIDTH // 2, 0), (WIDTH // 2, HEIGHT))

    pygame.display.flip()
    pygame.time.Clock().tick(60)

pygame.init()
game_loop()