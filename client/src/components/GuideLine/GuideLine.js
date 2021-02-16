import React from "react";
import AboutImage from "../../images/forum.png";

export default function GuideLine() {
  return (
    <div>
      <div>
        <section className="Company-overview">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <h2>Community guideline/code of conduct</h2>

                <br />
                <p align="justify">
                  <p>
                    1. All business requests should be sent to administrators
                    and not posted directly on the group.
                  </p>
                  <p>
                    2. All members should be treated with respect and dignity.
                  </p>
                  <p>
                    3. No swearing will be tolerated during opened exchange
                    sessions.
                  </p>
                  <p>
                    4. Always keep to the purpose of the group! Do not share
                    irrelevant messages about other topics.
                  </p>
                  <p>5. Do not spam the group</p>
                  <p>
                    6. Do not have one-on-one conversations in the group. Switch
                    to private messages.
                  </p>
                  <p>
                    7. Do not post in the group between 21:00 and 07:00 unless
                    it is an all-out emergency.
                  </p>
                  <p>
                    8. If a message asks for a positive response like an RSVP,
                    don’t reply in the negative. Only say if you are able to
                    attend. Don’t double RSVP if a second call to action is sent
                    out for the same event.
                  </p>
                  <p>
                    9. If someone asks a question and you don’t know the answer
                    don’t respond with “I don’t know”. Just wait for someone who
                    knows the answer to reply.
                  </p>
                  <p>
                    10.Please don’t send in a hundred “thank you” messages. If
                    you feel gratitude towards someone – tell them in a private
                    message.
                  </p>
                  <p>
                    11.Share your message in one single chunk of text with a
                    graphic summary if possible.
                  </p>
                  <p>
                    12.If someone asks a question of a personal nature (like
                    asking for advice) don’t respond if someone else has already
                    answered, or else respond to the person directly in a
                    private message.
                  </p>
                  <p>
                    13.The group is not a political nor a religious platform. No
                    arguing, no heated opinions, no fear mongering, no hyped-up
                    drama, no fake news. Check your sources before you share.
                  </p>
                  <p>
                    14.Never EVER use the group to berate someone else or air
                    grievances. If you have an issue address it one on one with
                    the relevant person.
                  </p>
                  <p>15.Don’t send data-insensitive messages.</p>
                  <p>
                    16.Hit “Mute” on your WhatsApp group during discussions if
                    you are busy. This is a sanity saver. You will still receive
                    all the messages, but your phone won’t buzz or make a noise
                    for every one of them.
                  </p>
                </p>
                <p align="justify">
                  N.B: All these rules are in place in order to make the group
                  healthy and productive, and for its sole purpose of empowering
                  each and every one of us. Without those guidelines, the group
                  will quickly become saturated and eventually people will start
                  leaving and we do not want that. Your cooperation will be
                  highly appreciated.
                </p>
                <p>Regards, the team</p>
              </div>
              <div className="col-md-6 col-sm-12">
                <img src={AboutImage} alt="img" className="aboutImg" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
