(function() {

  angular.module('Skylark.Lib')
    .service('MessageService', MessageService);

  var channels = [];

  /**
   *  All purpose Messaging Service for communicating between directives and controllers. 
   * @returns { object } service object
   *
   */
  function MessageService() {

    var service = {};

    /**
     * register channel
     * @description : register a channel for a scope that needs to listen for it.
     * 
     * @param  { string } - Name of channel to be registered
     * @param { int } limit of subscribers - subscribers that depend on unique IDs should to be limited
     *  
     */
    service.registerChannel = (name, limit) => {
      var exists = service.get(name);
      if (!exists) {
        channels.push({
          name: name,
          subscribers: [],
          lock: false,
          limit: limit
        });
      }
    };

    /**
     * get
     *
     * @description : retrieves channel by name and returns it as an object
     * 
     * @param  { string } channel name
     * @return { Object } - channel object
     * 
     */
    service.get = (channel) => {
      var retObj;
      channels.forEach(ch => {
        if (ch.name === channel) {
          retObj = ch;
        }
      });
      return retObj;
    };

    /**
     * lockChannel
     * 
     * @description : prevents adding subscribers if channel has reached its limit of subs
     * @param { Object } [varname] [description]
     * 
     * TODO : This should recieve a channel name and use get to fetch the channel from the registry. 
     * 
     */
    service.lockChannel = (channel) => {
      channel.lock = true;
    };

    /**
     * unlockChannel
     * 
     * @description : prevents adding subscribers if channel has reached its limit of subs
     * @param { Object } [varname] [description]
     *
     * TODO : This should recieve a channel name and use get to fetch the channel from the registry. 
     * 
     */
    service.unlockChannel = (channel) => {
      channel.lock = false;
    };

    /**
     * on
     *
     * @description: adds current scope to the subscribers of a specified channel
     * 
     * @param  { string }   channel name
     * @param  { function } function callback - will work with data passed on from publish method
     *
     * 
     */
    service.on = (channel, cb) => {
      channels.forEach(ch => {
        if (ch.name === channel) {
          if (ch.limit === ch.subscribers.length) {
            return;
          }
          ch.subscribers.push(cb);
        }
      });
    };

    /**
     * publish
     *
     * @description : register a new channel. When a new channel is published its subscribers are updated with a new callback.
     * 
     * @param  { } channel - channel to be published
     * @param  { any } data to be passed on through the channel
     * 
     */
    service.publish = (channel, data) => {
      var ch = service.get(channel);
      ch.subscribers.forEach(sub => {
        sub(ch, data);
      });
    };

    /**
     * clearChannels
     * 
     * @return { void } [description]
     * wipes out all the current channels. 
     * this is dangerous so it should only be used in things like route change.
     * 
     */
    service.clearChannels = () => {
      channels = [];
    };

    /**
     *
     *  Unregister Channel
     *  @description: Unregister channel when it no longer exists. useful when it's not convenient to 
     *  wipe out the channels array.
     *
     *  @param { object } channel - channel to be cleared
     *  
     */
    service.unregisterChannel = (channel) => {
      channels.forEach((ch, index) => {
        if (ch.name === channel) {
          channels.splice(index, 1);
        }
      });
    };

    /**
     * temp function for debugging
     */
    
    service.logChannels = () => {
      console.log('currently registered channels', channels);
    };

    return service;
  }

})();