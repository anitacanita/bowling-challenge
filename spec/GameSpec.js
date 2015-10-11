describe('Game', function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it('has 10 frames', function() {
    expect(game.TOTAL_FRAMES).toEqual(10);
  });

  it('starts with empty frames list', function() {
    expect(game.frames.length).toEqual(0);
  });

  it('starts with a total score of 0', function() {
    expect(game.currentScore).toEqual(0);
  });

  describe('gameplay', function() {

    it('starts a frame', function() {
      game.nextFrame();
      expect(game.frames.length).toEqual(1);
    });

    it('when frame has 0 pins, start next frame', function() {
      game.nextFrame();
      var frame = game.frames[0];
      frame.knockDown(10);
      game.nextFrame();
      expect(game.frames.length).toEqual(2);
    });

    it('when frame still has pins, do not start next frame', function() {
      game.nextFrame();
      var frame = game.frames[0];
      frame.knockDown(9);
      game.nextFrame();
      expect(game.frames.length).toEqual(1);
    });

    it('when frame has 2 rolls completed, start next frame', function() {
      game.nextFrame();
      game.frames[0].knockDown(5);
      game.frames[0].knockDown(4);
      game.nextFrame();
      expect(game.frames.length).toEqual(2);
    });

    it('when player knocks 1 pin then 2 pins the game score is 3', function() {
      game.nextFrame();
      game.frames[0].knockDown(1);
      game.frames[0].knockDown(2);
      expect(game.totalScore()).toEqual(3);
    });

    it('when player rolls once, the game score is still 0', function() {
      game.nextFrame();
      game.frames[0].knockDown(1);
      expect(game.totalScore()).toEqual(0);
    });

    it('the game score accumulates frame scores', function() {
      game.nextFrame();
      game.frames[0].knockDown(1);
      game.frames[0].knockDown(2);
      game.nextFrame();
      game.frames[1].knockDown(3);
      game.frames[1].knockDown(4);
      expect(game.totalScore()).toEqual(10);
    });

    it('the game score accumulates frame scores', function() {
      game.knockDown(1);
      game.knockDown(2);
      game.knockDown(3);
      game.knockDown(4);
      expect(game.totalScore()).toEqual(10);
    });
  });

});